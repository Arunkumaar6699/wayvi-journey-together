
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  phone: string;
  isProfileComplete: boolean;
  profilePicture?: string;
  isDriver?: boolean;
  preferences?: {
    music: string;
    smoking: boolean;
    ac: boolean;
  };
  rewards?: {
    points: number;
    badges: string[];
    streak: number;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string, otp: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      const savedUser = localStorage.getItem('wayvi_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    };
    
    setTimeout(checkAuth, 1000);
  }, []);

  const login = async (phone: string, otp: string) => {
    // Simulate OTP verification
    if (otp === '1234') {
      const newUser: User = {
        id: '1',
        name: '',
        phone,
        isProfileComplete: false,
        rewards: {
          points: 0,
          badges: [],
          streak: 0
        }
      };
      setUser(newUser);
      localStorage.setItem('wayvi_user', JSON.stringify(newUser));
    } else {
      throw new Error('Invalid OTP');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wayvi_user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('wayvi_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
