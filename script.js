document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Footer Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Cursor Glow Follower
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    // 3. Ambient Canvas Animation
    const canvas = document.getElementById('ambient-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        // Floating ambient nodes
        const nodes = Array.from({ length: 45 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            alpha: Math.random() * 0.5 + 0.2
        }));

        function drawAmbient() {
            ctx.clearRect(0, 0, width, height);

            // Draw subtle background gradient mesh
            const grad1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 0, width * 0.2, height * 0.3, width * 0.5);
            grad1.addColorStop(0, 'rgba(0, 242, 255, 0.04)');
            grad1.addColorStop(1, 'transparent');
            ctx.fillStyle = grad1;
            ctx.fillRect(0, 0, width, height);

            const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 0, width * 0.8, height * 0.7, width * 0.5);
            grad2.addColorStop(0, 'rgba(168, 85, 247, 0.04)');
            grad2.addColorStop(1, 'transparent');
            ctx.fillStyle = grad2;
            ctx.fillRect(0, 0, width, height);

            // Update & Draw Nodes
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 242, 255, ${node.alpha})`;
                ctx.fill();
            });

            // Connect nearby nodes
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(0, 242, 255, ${0.12 * (1 - dist / 130)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(drawAmbient);
        }

        drawAmbient();
    }

    // 4. Toast Notification Manager
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    let toastTimeout;

    function showToast(msg) {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = msg;
        toast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 5. Copy to Clipboard Action
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`Copied "${textToCopy}" to clipboard! ✨`);
                }).catch(() => {
                    // Fallback
                    const tempInput = document.createElement('input');
                    tempInput.value = textToCopy;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempInput);
                    showToast(`Copied "${textToCopy}" to clipboard! ✨`);
                });
            }
        });
    });

    // 6. Quick Contact Form Handler
    const contactForm = document.getElementById('quick-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const senderName = document.getElementById('sender-name')?.value || 'Friend';
            showToast(`Thanks ${senderName}! Message received 🚀`);
            contactForm.reset();
        });
    }

    // 7. Back to Top Smooth Scroll
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
