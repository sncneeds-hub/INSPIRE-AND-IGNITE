@@ .. @@
   const navLinks = [
     { name: 'Home', href: '#home', icon: Award },
     { name: 'Drawing Competition', href: '#drawing-competition', icon: Palette },
     { name: 'Teacher Awards', href: '#teacher-awards', icon: Users },
     { name: 'Timeline', href: '#timeline', icon: Clock },
     { name: 'Prizes', href: '#prizes', icon: Trophy },
-    { name: 'Contact', href: '#contact', icon: Phone }
+    { name: 'Contact', href: '#contact', icon: Phone },
+    { name: 'Vote', href: '/vote', icon: Users, external: true }
   ];

   const scrollToSection = (href) => {
-    const element = document.querySelector(href);
-    if (element) {
-      element.scrollIntoView({ behavior: 'smooth' });
+    if (href.startsWith('/')) {
+      // External link
+      window.location.href = href;
+    } else {
+      // Internal anchor
+      const element = document.querySelector(href);
+      if (element) {
+        element.scrollIntoView({ behavior: 'smooth' });
+      }
     }
     setIsOpen(false);
   };
@@ .. @@
           {/* CTA Button */}
           <div className="hidden lg:flex">
-            <Button 
-              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
-              onClick={() => scrollToSection('#contact')}
-            >
-              Get Started
-            </Button>
+            <div className="flex gap-2">
+              <Button 
+                variant="outline"
+                className="text-white border-white hover:bg-white hover:text-slate-900"
+                onClick={() => window.location.href = '/school/login'}
+              >
+                School Login
+              </Button>
+              <Button 
+                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
+                onClick={() => window.location.href = '/admin/login'}
+              >
+                Admin Login
+              </Button>
+            </div>
           </div>
@@ .. @@
             <div className="pt-4">
               <Button 
                 className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
-                onClick={() => scrollToSection('#contact')}
+                onClick={() => window.location.href = '/school/login'}
               >
-                Get Started
+                School Login
               </Button>
             </div>