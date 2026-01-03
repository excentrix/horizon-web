// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const Footer = () => {
//   const footerRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(footerRef.current, {
//         scrollTrigger: {
//           trigger: footerRef.current,
//           start: "top 95%",
//           toggleActions: "play none none reverse",
//         },
//         y: 50,
//         opacity: 0,
//         duration: 0.8,
//         ease: "power3.out",
//       });
//     }, footerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <footer
//       ref={footerRef}
//       className="py-12 px-4 bg-background border-t-4 border-foreground"
//     >
//       <div className="container mx-auto max-w-6xl">
//         <div className="flex flex-col md:flex-row justify-between items-center gap-8">
//           <div className="flex items-center gap-2">
//             {/* <div className="w-10 h-10 bg-foreground border-2 border-foreground relative overflow-hidden">
//               <div className="absolute inset-0 bg-accent transform -skew-x-12" />
//             </div> */}
//             {/* <span className="text-2xl font-black tracking-tighter">Horizon</span> */}
//             <div className="flex items-center">
//               <div className="border-4 border-foreground bg-secondary px-4 py-2 rotate-[-2deg] shadow-harsh">
//                 <span className="text-2xl font-black">HORIZON</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-8">
//             <a
//               href="#"
//               className="font-mono text-sm hover:text-accent transition-colors"
//             >
//               PRIVACY
//             </a>
//             <a
//               href="#"
//               className="font-mono text-sm hover:text-accent transition-colors"
//             >
//               TERMS
//             </a>
//             <a
//               href="#"
//               className="font-mono text-sm hover:text-accent transition-colors"
//             >
//               CONTACT
//             </a>
//           </div>

//           <p className="font-mono text-sm opacity-60">
//             © 2025 Excentrix. Built different.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
