function openVideo(videoUrl) {
    window.open(videoUrl, '_blank');
}
const thumbnails = document.querySelectorAll('.thumbnail');
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('mousemove', function(e) {
        const cursorEffect = this.querySelector('.cursor-effect');
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - cursorEffect.offsetWidth / 2;
        const y = e.clientY - rect.top - cursorEffect.offsetHeight / 2;

        cursorEffect.style.left = `${x}px`;
        cursorEffect.style.top = `${y}px`;
    });
});
