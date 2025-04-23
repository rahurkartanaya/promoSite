// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Audio elements
    const heroAudio = document.getElementById('hero-audio');
    const socialAudio = document.getElementById('social-audio');
    
    // Global audio control
    const audioToggle = document.getElementById('audio-toggle');
    const audioIcon = audioToggle.querySelector('.audio-icon');
    let isMuted = false;
    
    // Array of section audio pairs for easier management
    const sectionAudios = [
        { section: document.getElementById('hero'), audio: heroAudio },
        { section: document.getElementById('social-media'), audio: socialAudio }
    ];
    
    // Function to toggle mute state for all audio elements
    function toggleMute() {
        isMuted = !isMuted;
        
        // Update all audio elements
        sectionAudios.forEach(({ audio }) => {
            if (audio) {
                audio.muted = isMuted;
            }
        });
        
        // Update button appearance
        if (isMuted) {
            audioIcon.textContent = '🔇';
            audioToggle.classList.add('muted');
        } else {
            audioIcon.textContent = '🔊';
            audioToggle.classList.remove('muted');
        }
    }
    
    // Add event listener to audio toggle button
    if (audioToggle) {
        audioToggle.addEventListener('click', toggleMute);
    }
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Consider an element in view when it occupies a significant portion of the viewport
        return (
            rect.top <= windowHeight * 0.5 &&
            rect.bottom >= windowHeight * 0.5
        );
    }
    
    // Function to handle audio playback based on scroll position
    function handleSectionAudio() {
        sectionAudios.forEach(({ section, audio }) => {
            if (!section || !audio) return;
            
            if (isInViewport(section)) {
                // If this section is in view, force play its audio
                // Apply current mute state before playing
                audio.muted = isMuted;
                
                // Force play with retry mechanism
                const playPromise = audio.play();
                
                if (playPromise !== undefined) {
                    playPromise.catch(e => {
                        console.log("Audio play prevented, retrying:", e);
                        
                        // Try again with user interaction simulation
                        document.addEventListener('click', function playAudioOnce() {
                            audio.play().catch(e => console.log("Retry failed:", e));
                            document.removeEventListener('click', playAudioOnce);
                        }, { once: true });
                        
                        // Also try after a short delay
                        setTimeout(() => {
                            audio.play().catch(e => console.log("Delayed retry failed:", e));
                        }, 1000);
                    });
                }
                
                // Pause other sections' audio
                sectionAudios.forEach(other => {
                    if (other.section !== section && other.audio && !other.audio.paused) {
                        other.audio.pause();
                    }
                });
            } else {
                // If section is not in view, pause its audio
                if (!audio.paused) {
                    audio.pause();
                }
            }
        });
    }
    
    // Add scroll event listener for audio control
    window.addEventListener('scroll', handleSectionAudio);
    
    // Initial check for audio playback with multiple attempts
    setTimeout(() => {
        handleSectionAudio();
        
        // Try to play the first visible section's audio immediately
        const firstVisibleSection = sectionAudios.find(({ section }) => section && isInViewport(section));
        if (firstVisibleSection && firstVisibleSection.audio) {
            firstVisibleSection.audio.muted = isMuted;
            firstVisibleSection.audio.play().catch(e => console.log("Initial play prevented:", e));
            
            // Try again after a short delay
            setTimeout(() => {
                if (firstVisibleSection.audio) {
                    firstVisibleSection.audio.play().catch(e => console.log("Delayed initial play prevented:", e));
                }
            }, 500);
        }
    }, 1000);
    
    // Add a click event listener to the document to enable audio on first user interaction
    document.addEventListener('click', function enableAudioOnClick() {
        const visibleSection = sectionAudios.find(({ section }) => section && isInViewport(section));
        if (visibleSection && visibleSection.audio) {
            visibleSection.audio.muted = isMuted;
            visibleSection.audio.play().catch(e => console.log("Click play prevented:", e));
        }
        document.removeEventListener('click', enableAudioOnClick);
    }, { once: true });

    // Add hover effect to Instagram posts
    const instagramPosts = document.querySelectorAll('.instagram-post');
    
    instagramPosts.forEach(post => {
        post.addEventListener('mouseenter', function() {
            this.querySelector('.post-image img').style.transform = 'scale(1.05)';
        });
        
        post.addEventListener('mouseleave', function() {
            this.querySelector('.post-image img').style.transform = 'scale(1)';
        });
    });

    // Add scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const socialMediaSection = document.getElementById('social-media');
            
            if (socialMediaSection) {
                window.scrollTo({
                    top: socialMediaSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
});
