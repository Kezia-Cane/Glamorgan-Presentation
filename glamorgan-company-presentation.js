(function(){
  const header=document.querySelector('[data-header]');
  const menuToggle=document.querySelector('.menu-toggle');
  const mobileMenu=document.querySelector('.mobile-menu');
  if(menuToggle){menuToggle.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.textContent=open?'Close':'Menu';});}
  document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{if(mobileMenu){mobileMenu.classList.remove('open');menuToggle?.setAttribute('aria-expanded','false');menuToggle&&(menuToggle.textContent='Menu');}}));

  if(window.gsap&&window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.pulse-hero-content>*',{opacity:0,y:34,duration:1,stagger:.1,ease:'power3.out',delay:.15});
    gsap.from('.pulse-feature-photo',{opacity:0,scale:.94,duration:1.2,ease:'power3.out',delay:.25});
    gsap.utils.toArray('.reveal-up').forEach((el)=>gsap.to(el,{opacity:1,y:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 84%',once:true}}));
    gsap.to('[data-parallax] img',{yPercent:-9,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
    gsap.to('.values-list',{y:-50,ease:'none',scrollTrigger:{trigger:'.values',start:'top bottom',end:'bottom top',scrub:1}});
    gsap.utils.toArray('.testimonial-copy blockquote, .display-copy').forEach((el)=>gsap.fromTo(el,{opacity:.16},{opacity:1,ease:'none',scrollTrigger:{trigger:el,start:'top 82%',end:'top 45%',scrub:true}}));
    gsap.utils.toArray('.service-card, .testimonial-media img, .closing-image img').forEach((el)=>gsap.fromTo(el,{scale:.88,opacity:.5},{scale:1,opacity:1,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 90%',end:'top 55%',scrub:1}}));
    gsap.to('.hero-orbit',{rotation:25,duration:18,repeat:-1,ease:'none'});
  }else{document.querySelectorAll('.reveal-up').forEach(el=>{el.style.opacity=1;el.style.transform='none';});}

  const observer=new IntersectionObserver((entries)=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('is-visible');}),{threshold:.12});
  document.querySelectorAll('.reveal-up').forEach(el=>observer.observe(el));
  const introVideo=document.querySelector('.video-frame video');
  if(introVideo){
    const videoObserver=new IntersectionObserver((entries)=>entries.forEach(entry=>{
      if(entry.isIntersecting){introVideo.play().catch(()=>{});}else{introVideo.pause();}
    }),{threshold:.45});
    videoObserver.observe(introVideo);
  }
  const testimonialQuote=document.querySelector('.testimonial-copy blockquote');
  const testimonialLines=[
    '“You should never have to wonder what is happening in your own home. We keep the work clear, the space respected, and the next step easy to understand.”',
    '“The best service feels calm. We listen first, explain what we find, and leave homeowners feeling confident about what comes next.”',
    '“Comfort is personal. That is why every visit is built around the people, routines, and spaces we are there to support.”'
  ];
  document.querySelectorAll('.testimonial-control').forEach((control,index)=>control.addEventListener('click',()=>{if(!testimonialQuote)return;testimonialQuote.textContent=testimonialLines[index];document.querySelectorAll('.testimonial-control').forEach((item,i)=>item.classList.toggle('is-active',i===index));}));
  let lastY=0;
  window.addEventListener('scroll',()=>{const y=window.scrollY;if(header)header.classList.toggle('header-scrolled',y>lastY&&y>60);lastY=y;},{passive:true});
})();
