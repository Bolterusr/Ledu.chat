import React, { useState, useEffect, createContext, useContext } from 'react';

// Route context
interface RouteContextType {
  currentPath: string;
  navigate: (path: string) => void;
}

const RouteContext = createContext<RouteContextType>({
  currentPath: '/',
  navigate: () => {},
});

// Route provider that handles navigation
export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  return (
    <RouteContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouteContext.Provider>
  );
};

// Hook to use routing
export const useRouter = () => {
  return useContext(RouteContext);
};

// Routes component
export const Routes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentPath } = useRouter();

  // Filter out the route that matches the current path
  const matchedRoute = React.Children.toArray(children).find(
    (child) => {
      if (React.isValidElement(child) && child.props.path) {
        return child.props.path === currentPath;
      }
      return false;
    }
  );

  return <RouterProvider>{matchedRoute || null}</RouterProvider>;
};

// Route component
interface RouteProps {
  path: string;
  element: React.ReactNode;
}

export const Route: React.FC<RouteProps> = ({ path, element }) => {
  return <>{element}</>;
};

// Link component
interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({ to, children, className = '' }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};