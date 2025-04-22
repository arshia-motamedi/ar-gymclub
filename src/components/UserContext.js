import React, { createContext, useContext, useState, useEffect } from 'react'; 

const UserContext = createContext(); 

// custom hook برای دسترسی به UserContext 
export const useUserContext = () => useContext(UserContext); 

export const UserProvider = ({ children }) => { 
  const [user, setUser] = useState(null); 
  const [alertMessage, setAlertMessage] = useState(''); 
  const [alertSeverity, setAlertSeverity] = useState('error'); // severity را می‌توانید به 'error' یا 'success' تغییر دهید 

  // وقتی صفحه لود می‌شود، بررسی می‌کنیم که آیا اطلاعات کاربر در localStorage وجود دارد یا نه 
  useEffect(() => { 
    const storedUser = localStorage.getItem('user'); 
    if (storedUser) { 
      setUser(storedUser); // اگر موجود بود، وضعیت user را تنظیم می‌کنیم 
    } 
  }, []); 

  const loginUser = (userName) => { 
    setUser(userName); 
    localStorage.setItem('user', userName); // ذخیره‌سازی نام کاربر در localStorage 
  }; 

  const logoutUser = () => { 
    setUser(null); 
    localStorage.removeItem('user'); // حذف نام کاربر از localStorage 
  }; 

  const showAlert = (message, severity = 'error') => { 
    setAlertMessage(message); 
    setAlertSeverity(severity); 
    setTimeout(() => { 
      setAlertMessage(''); // پیام هشدار بعد از 3 ثانیه پاک می‌شود 
    }, 3000); 
  }; 

  return ( 
    <UserContext.Provider value={{setUser, user, loginUser, logoutUser, showAlert, alertMessage, alertSeverity }}> 
      {children} 
    </UserContext.Provider> 
  ); 
};
