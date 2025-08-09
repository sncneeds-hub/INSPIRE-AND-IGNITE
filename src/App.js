@@ .. @@
 import React from "react";
 import "./App.css";
-import { BrowserRouter, Routes, Route } from "react-router-dom";
+import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
 import Navbar from "./components/Navbar";
 import Hero from "./components/Hero";
 import DrawingCompetition from "./components/DrawingCompetition";
 import TeacherAwards from "./components/TeacherAwards";
 import Timeline from "./components/Timeline";
 import Prizes from "./components/Prizes";
 import Contact from "./components/Contact";
 import Footer from "./components/Footer";
+import LoginForm from "./components/auth/LoginForm";
+import SchoolDashboard from "./components/school/SchoolDashboard";
+import AdminDashboard from "./components/admin/AdminDashboard";
+import PublicVoting from "./components/voting/PublicVoting";
 import { Toaster } from "./components/ui/toaster";
+import { useState } from "react";

 const Home = () => {
   return (
@@ .. @@
 };

 function App() {
+  const [user, setUser] = useState(null);
+
+  const handleLogin = (userData) => {
+    setUser(userData);
+  };
+
+  const handleLogout = () => {
+    setUser(null);
+  };
+
   return (
     <div className="App">
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<Home />} />
+          
+          {/* Authentication Routes */}
+          <Route 
+            path="/school/login" 
+            element={
+              user && user.userType === 'school' ? 
+                <Navigate to="/school/dashboard" replace /> :
+                <LoginForm userType="school" onLogin={handleLogin} />
+            } 
+          />
+          <Route 
+            path="/admin/login" 
+            element={
+              user && user.userType === 'admin' ? 
+                <Navigate to="/admin/dashboard" replace /> :
+                <LoginForm userType="admin" onLogin={handleLogin} />
+            } 
+          />
+          
+          {/* Dashboard Routes */}
+          <Route 
+            path="/school/dashboard" 
+            element={
+              user && user.userType === 'school' ? 
+                <SchoolDashboard user={user} onLogout={handleLogout} /> :
+                <Navigate to="/school/login" replace />
+            } 
+          />
+          <Route 
+            path="/admin/dashboard" 
+            element={
+              user && user.userType === 'admin' ? 
+                <AdminDashboard user={user} onLogout={handleLogout} /> :
+                <Navigate to="/admin/login" replace />
+            } 
+          />
+          
+          {/* Public Voting */}
+          <Route path="/vote" element={<PublicVoting />} />
+          
+          {/* Redirect unknown routes */}
+          <Route path="*" element={<Navigate to="/" replace />} />
         </Routes>
       </BrowserRouter>
       <Toaster />