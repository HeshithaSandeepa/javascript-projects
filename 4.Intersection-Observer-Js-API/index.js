const testamonialSection = document.querySelector(".testamonialSection");

const wantToTalk = document.querySelector('.wantToTalk');




const options = {
  threshold: 0, //u can change this value 0 t0 1.0 recommended value is 0 to 0.5
  rootMargin: "0px 0px -200px 0px", //margin with root higher උඩම වෙබ් සයිට් එකේ
  root: null


};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    console.log(entry.target);

    const intersecting = entry.isIntersecting;
    if (intersecting) {
      entry.target.classList.add('opacityOn');
      entry.target.classList.add('blendin');
      observer.unobserve(entry.target);

    }
    else {
      entry.target.classList.remove('opacityOn');
      entry.target.classList.remove('blendin');
    }

  })
}, options);

// one div observe 
observer.observe(wantToTalk);
observer.observe(testamonialSection);



// targetDivSections.forEach(targetDivSection => {
//   // many div observe
//   observer.observe(targetDivSection);
// })