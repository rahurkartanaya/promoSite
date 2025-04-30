// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Audio elements
    const galleryAudio = document.getElementById('gallery-audio');
    const backgroundMusic = document.getElementById('background-music');
    
    // Gallery audio controls
    const galleryAudioPlay = document.getElementById('gallery-audio-play');
    const galleryAudioPause = document.getElementById('gallery-audio-pause');
    
    // Global audio control
    const audioToggle = document.getElementById('audio-toggle');
    let audioIcon = null;
    if (audioToggle) {
        audioIcon = audioToggle.querySelector('.audio-icon');
    }
    let isMuted = false;
    
    // Array of section audio pairs for easier management
    const sectionAudios = [
        { section: document.getElementById('gallery'), audio: galleryAudio }
    ];
    
    // Background music reference (only used on social media page)
    let globalBackgroundMusic = null;
    if (backgroundMusic) {
        globalBackgroundMusic = backgroundMusic;
        // Start playing the background music on social media page
        globalBackgroundMusic.volume = 0.3; // Lower volume for background music
        globalBackgroundMusic.play().catch(e => console.log("Background music play prevented:", e));
    }
    
    // Function to toggle mute state for all audio elements
    function toggleMute() {
        isMuted = !isMuted;
        
        // Update all audio elements
        sectionAudios.forEach(({ audio }) => {
            if (audio) {
                audio.muted = isMuted;
            }
        });
        
        // Also mute/unmute the background music if it exists
        if (globalBackgroundMusic) {
            globalBackgroundMusic.muted = isMuted;
        }
        
        // Update button appearance
        if (audioIcon) {
            if (isMuted) {
                audioIcon.textContent = '🔇';
                if (audioToggle) {
                    audioToggle.classList.add('muted');
                }
            } else {
                audioIcon.textContent = '🔊';
                if (audioToggle) {
                    audioToggle.classList.remove('muted');
                }
            }
        }
    }
    
    // Add event listener to audio toggle button
    if (audioToggle) {
        audioToggle.addEventListener('click', toggleMute);
    }
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
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
            // Skip if section or audio is null/undefined
            if (!section || !audio) return;
            
            if (isInViewport(section)) {
                // Only play gallery audio when gallery section is in view
                if (section.id === 'gallery' && audio === galleryAudio) {
                    // Apply current mute state before playing
                    audio.muted = isMuted;
                    
                    // Force play with retry mechanism
                    const playPromise = audio.play();
                    
                    if (playPromise !== undefined) {
                        playPromise.catch(e => {
                            console.log("Gallery audio play prevented, retrying:", e);
                            
                            // Try again with user interaction simulation
                            document.addEventListener('click', function playAudioOnce() {
                                audio.play().catch(e => console.log("Gallery retry failed:", e));
                                document.removeEventListener('click', playAudioOnce);
                            }, { once: true });
                            
                            // Also try after a short delay
                            setTimeout(() => {
                                audio.play().catch(e => console.log("Delayed gallery retry failed:", e));
                            }, 1000);
                        });
                    }
                }
            } else {
                // If section is not in view, pause its audio
                if (!audio.paused) {
                    audio.pause();
                }
            }
        });
    }
    
    // Gallery audio play/pause controls
    if (galleryAudioPlay) {
        galleryAudioPlay.addEventListener('click', function() {
            if (galleryAudio) {
                galleryAudio.muted = isMuted;
                galleryAudio.play().catch(e => console.log("Gallery audio play failed:", e));
            }
        });
    }
    
    if (galleryAudioPause) {
        galleryAudioPause.addEventListener('click', function() {
            if (galleryAudio && !galleryAudio.paused) {
                galleryAudio.pause();
            }
        });
    }
    
    // Add scroll event listener for audio control
    window.addEventListener('scroll', handleSectionAudio);
    
    // Initial check for audio playback with multiple attempts
    setTimeout(() => {
        handleSectionAudio();
        
        // Only try to play gallery audio if gallery section is in view
        const gallerySection = document.getElementById('gallery');
        if (gallerySection && galleryAudio && isInViewport(gallerySection)) {
            galleryAudio.muted = isMuted;
            galleryAudio.play().catch(e => console.log("Initial gallery play prevented:", e));
            
            // Try again after a short delay
            setTimeout(() => {
                galleryAudio.play().catch(e => console.log("Delayed initial gallery play prevented:", e));
            }, 500);
        }
    }, 1000);
    
    // Add a click event listener to the document to enable audio on first user interaction
    document.addEventListener('click', function enableAudioOnClick() {
        const gallerySection = document.getElementById('gallery');
        
        // Only play gallery audio if gallery section is in view
        if (gallerySection && galleryAudio && isInViewport(gallerySection)) {
            galleryAudio.muted = isMuted;
            galleryAudio.play().catch(e => console.log("Gallery audio click play prevented:", e));
        }
        
        // Also play the background music if it exists (for social media page)
        if (globalBackgroundMusic) {
            globalBackgroundMusic.muted = isMuted;
            globalBackgroundMusic.play().catch(e => console.log("Background music click play prevented:", e));
        }
        
        document.removeEventListener('click', enableAudioOnClick);
    }, { once: true });
    // Glitch effect intensity based on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const hero = document.getElementById('hero');
        
        // Only proceed if hero element exists
        if (hero) {
            const heroHeight = hero.offsetHeight;
            
            // Increase glitch effect as user scrolls away from hero section
            if (scrollPosition < heroHeight) {
                const glitchIntensity = scrollPosition / heroHeight;
                document.documentElement.style.setProperty('--glitch-intensity', glitchIntensity);
            }
        }
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Countdown timer
    function updateCountdown() {
        // Set the date we're counting down to (31 days from now)
        const countDownDate = new Date();
        countDownDate.setDate(countDownDate.getDate() + 31);
        
        // Get current date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the countdown date
        const distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update the countdown display
        const countdownItems = document.querySelectorAll('.countdown-item .count');
        if (countdownItems.length >= 4) {
            countdownItems[0].textContent = days;
            countdownItems[1].textContent = hours;
            countdownItems[2].textContent = minutes;
            countdownItems[3].textContent = seconds;
        }
    }
    
    // Update the countdown only if countdown elements exist
    const countdownItems = document.querySelectorAll('.countdown-item .count');
    if (countdownItems.length >= 4) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Parallax effect for synopsis section
    window.addEventListener('scroll', function() {
        const synopsisSection = document.getElementById('synopsis');
        if (!synopsisSection) return;
        
        const synopsisPosition = synopsisSection.getBoundingClientRect();
        const mirrorEffect = document.querySelector('.mirror-effect');
        
        if (synopsisPosition.top < window.innerHeight && synopsisPosition.bottom > 0 && mirrorEffect) {
            const scrollPosition = window.scrollY;
            const parallaxOffset = scrollPosition * 0.1;
            mirrorEffect.style.transform = `scaleY(-1) translateY(${parallaxOffset}px)`;
        }
    });

    // Add hover effect to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const posterOverlay = item.querySelector('.poster-overlay');
        const posterImage = item.querySelector('.poster-image');
        
        if (posterOverlay && posterImage) {
            item.addEventListener('mouseenter', function() {
                posterOverlay.style.opacity = '1';
                posterImage.style.transform = 'scale(1.1)';
            });
            
            item.addEventListener('mouseleave', function() {
                posterOverlay.style.opacity = '0';
                posterImage.style.transform = 'scale(1)';
            });
        }
    });

    // Add scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const synopsisSection = document.getElementById('synopsis');
            
            if (synopsisSection) {
                window.scrollTo({
                    top: synopsisSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Add subtle breathing effect to enhance the floating motion
    function breathingEffect() {
        const glitchText = document.querySelector('.glitch-text');
        
        // Only proceed if glitchText element exists
        if (glitchText) {
            // The main floating animation is handled by CSS
            // This just adds a subtle scale effect for more dimension
            glitchText.style.transition = 'transform 2s ease-in-out';
            
            // Subtle scale change
            if (glitchText.classList.contains('breathe-in')) {
                glitchText.classList.remove('breathe-in');
                glitchText.style.transform = 'scale(1)';
            } else {
                glitchText.classList.add('breathe-in');
                glitchText.style.transform = 'scale(1.03)';
            }
        }
    }
    
    // Trigger breathing effect periodically
    setInterval(breathingEffect, 4000);
});
