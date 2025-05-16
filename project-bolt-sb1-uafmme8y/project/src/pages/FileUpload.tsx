import React, { useState, useRef } from 'react';
import { Upload, FileText, Image, File, X, ArrowRight, Check, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  darkMode: boolean;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  errorMessage?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ darkMode }) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = (file: File): UploadedFile => {
    // Generate a unique ID
    const id = Math.random().toString(36).substring(2, 9);
    
    return {
      id,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'uploading'
    };
  };

  const simulateFileProcess = (fileId: string) => {
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setFiles(prevFiles => {
        const updatedFiles = prevFiles.map(file => {
          if (file.id === fileId && file.status === 'uploading') {
            const newProgress = file.progress + 10;
            
            if (newProgress >= 100) {
              clearInterval(uploadInterval);
              return { ...file, progress: 100, status: 'processing' };
            }
            
            return { ...file, progress: newProgress };
          }
          return file;
        });
        
        return updatedFiles;
      });
    }, 300);

    // After upload is complete, simulate processing
    setTimeout(() => {
      clearInterval(uploadInterval);
      
      setFiles(prevFiles => {
        return prevFiles.map(file => {
          if (file.id === fileId) {
            // Randomly simulate an error for demonstration
            const success = Math.random() > 0.2;
            
            if (success) {
              return { ...file, progress: 100, status: 'complete' };
            } else {
              return { 
                ...file, 
                status: 'error', 
                errorMessage: 'Failed to process file. Please try again.' 
              };
            }
          }
          return file;
        });
      });
    }, 4000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = [];
    
    Array.from(fileList).forEach(file => {
      const processedFile = processFile(file);
      newFiles.push(processedFile);
      simulateFileProcess(processedFile.id);
    });
    
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (id: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
  };

  const retryFile = (id: string) => {
    setFiles(prevFiles => {
      return prevFiles.map(file => {
        if (file.id === id) {
          const updatedFile = { ...file, progress: 0, status: 'uploading', errorMessage: undefined };
          simulateFileProcess(id);
          return updatedFile;
        }
        return file;
      });
    });
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('image')) {
      return <Image size={24} />;
    } else if (fileType.includes('pdf')) {
      return <FileText size={24} />;
    } else {
      return <File size={24} />;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold mb-2">Upload Learning Materials</h1>
        <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Upload your notes, PDFs, images, or any documents for AI-powered processing
        </p>
      </div>

      <div 
        className={`
          rounded-lg border-2 border-dashed p-8 mb-8 text-center
          ${dragActive 
            ? darkMode 
              ? 'border-indigo-500 bg-indigo-900/20' 
              : 'border-indigo-500 bg-indigo-50' 
            : darkMode 
              ? 'border-gray-600 hover:border-gray-500' 
              : 'border-gray-300 hover:border-gray-400'
          }
          transition-colors duration-200
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center">
          <Upload 
            size={48} 
            className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} 
          />
          <h3 className="text-lg font-medium mb-2">
            {dragActive ? 'Drop your files here' : 'Drag & drop your files here'}
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Support for PDF, DOCX, JPG, PNG, and TXT files
          </p>
          <button
            onClick={handleButtonClick}
            className={`
              px-4 py-2 rounded-lg
              ${darkMode 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                : 'bg-indigo-500 hover:bg-indigo-600 text-white'
              }
              transition-colors duration-200
            `}
          >
            Browse Files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleChange}
            className="hidden"
          />
        </div>
      </div>

      {files.length > 0 && (
        <div className={`
          rounded-lg shadow-sm
          ${darkMode ? 'bg-gray-800' : 'bg-white'}
          mb-8
        `}>
          <div className="p-4 border-b dark:border-gray-700 border-gray-200">
            <h3 className="font-semibold">Uploaded Files</h3>
          </div>
          <ul className="divide-y dark:divide-gray-700 divide-gray-200">
            {files.map(file => (
              <li key={file.id} className="p-4">
                <div className="flex items-start">
                  <div className={`
                    p-2 rounded-md mr-3 
                    ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}
                  `}>
                    {getFileIcon(file.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium truncate">{file.name}</h4>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      
                      <div className="flex items-center ml-4">
                        {file.status === 'complete' && (
                          <span className={`
                            flex items-center text-xs font-medium mr-2
                            ${darkMode ? 'text-green-400' : 'text-green-600'}
                          `}>
                            <Check size={14} className="mr-1" /> Complete
                          </span>
                        )}
                        
                        {file.status === 'error' && (
                          <button 
                            onClick={() => retryFile(file.id)}
                            className={`
                              text-xs mr-2 px-2 py-1 rounded font-medium
                              ${darkMode 
                                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                              }
                            `}
                          >
                            Retry
                          </button>
                        )}
                        
                        <button 
                          onClick={() => removeFile(file.id)}
                          className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {(file.status === 'uploading' || file.status === 'processing') && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>
                            {file.status === 'uploading' ? 'Uploading...' : 'Processing...'}
                          </span>
                          <span>{file.progress}%</span>
                        </div>
                        <div className={`
                          w-full h-1.5 rounded-full overflow-hidden
                          ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}
                        `}>
                          <div 
                            className="h-full bg-indigo-500 transition-all duration-300 ease-out"
                            style={{ width: `${file.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {file.status === 'error' && (
                      <div className="mt-2 flex items-start text-sm text-red-500">
                        <AlertCircle size={14} className="mr-1 mt-0.5 flex-shrink-0" />
                        <span>{file.errorMessage}</span>
                      </div>
                    )}
                    
                    {file.status === 'complete' && (
                      <div className="mt-2">
                        <button className={`
                          flex items-center text-sm
                          ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'}
                        `}>
                          View Analysis <ArrowRight size={14} className="ml-1" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={`
        rounded-lg shadow-sm
        ${darkMode ? 'bg-gray-800' : 'bg-white'}
        p-6
      `}>
        <h3 className="font-semibold mb-4">Supported File Types</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`
            p-4 rounded-lg
            ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}
          `}>
            <div className="flex items-start">
              <FileText className={`mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
              <div>
                <h4 className="font-medium mb-1">Documents</h4>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  PDF, DOCX, TXT, RTF
                </p>
              </div>
            </div>
          </div>
          
          <div className={`
            p-4 rounded-lg
            ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}
          `}>
            <div className="flex items-start">
              <Image className={`mr-3 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
              <div>
                <h4 className="font-medium mb-1">Images</h4>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  JPG, PNG, WebP, GIF
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium mb-2">File Processing</h4>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            After uploading, our AI will automatically:
          </p>
          <ul className={`
            list-disc list-inside text-sm mt-2 space-y-1
            ${darkMode ? 'text-gray-400' : 'text-gray-600'}
          `}>
            <li>Extract text from documents and images using OCR</li>
            <li>Analyze content and identify key concepts</li>
            <li>Prepare the content for generating study materials</li>
            <li>Store your files securely for future reference</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;