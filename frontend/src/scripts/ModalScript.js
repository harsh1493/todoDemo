import '../styles/modal.css';

function openModal(noteEl, modalEl, modalContainerEl) {

    console.log("open modal called");
    // Compute and apply the transform to deform the modal to cover the note with a transition to make it animate
    const transform = computeTransform(noteEl);
    modalEl.style.transform = transform;
    modalEl.style.transition = 'transform 250ms';

    // Setup the modal background animate in too
    modalContainerEl.style.backgroundColor = 'transparent';
    modalContainerEl.style.transition = 'background-color 250ms';

    // Show the modal
    modalContainerEl.classList.add('modal-container--open');

    // Put the rest in a setTimeout to allow the styles applied above to take
    // affect and render before we overwrite them with new ones below
    setTimeout(function () {
      // Remove the transform to allow the modal to return to it's natural shape and position
      modalEl.style.transform = 'none';
      modalContainerEl.style.backgroundColor = 'rgba(33, 33, 33, 0.5)';
    }, 0)
  }

  function computeTransform(noteEl) {

    // Modal positions here are hardcoded to match styles set in CSS
    const modalTop = 150;
    const modalLeft = (document.body.offsetWidth / 2) - 300;
    const modalWidth = 600;
    const modalHeight = 150;

    // Get note div's position relative to the viewport
    const notePosition = noteEl.getBoundingClientRect();
    
    // Compute a CSS transform that moves the modal to match the note's position
    const translateX = notePosition.left - modalLeft;
    const translateY = notePosition.top - modalTop;
    const scaleX = notePosition.width / modalWidth;
    const scaleY = notePosition.height / modalHeight;

    return `translateX(${translateX}px) translateY(${translateY}px) scaleX(${scaleX}) scaleY(${scaleY})`;
  }

  // Handle click events using event delegation
  document.addEventListener('click', function (event) {

    // Handle click events on note elements (open modal)
    if (event.target.className === 'note') {
      console.log("note clicked");
      // Get a reference
      const modalContainerEl = document.querySelector('.modal-container');
      const modalEl = document.querySelector('.modal');
      openModal(event.target, modalEl, modalContainerEl);
    }

    // Handle click event on modal background element (close modal)
    if (event.target.classList.contains('modal-container')) {
      event.target.classList.remove('modal-container--open');
    }
  })