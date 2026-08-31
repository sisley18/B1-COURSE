/**
 * Platform Authentication System
 * Protects all course content with access password.
 * Works across mobile, tablet, and desktop devices.
 */

(function () {
    const AUTH_KEY = 'b1_course_auth_token';
    const VALID_PASSWORDS = [
        'stmarys2026',
        'ceci2026',
        'english2026',
        'b1course',
        'stmarys'
    ];

    function isAuthenticated() {
        return localStorage.getItem(AUTH_KEY) === 'true' || sessionStorage.getItem(AUTH_KEY) === 'true';
    }

    function setAuthenticated(remember) {
        if (remember) {
            localStorage.setItem(AUTH_KEY, 'true');
        }
        sessionStorage.setItem(AUTH_KEY, 'true');
    }

    window.logoutPlatform = function () {
        localStorage.removeItem(AUTH_KEY);
        sessionStorage.removeItem(AUTH_KEY);
        location.reload();
    };

    function createAuthModal() {
        if (document.getElementById('platform-auth-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'platform-auth-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #1e1b4b 0%, #4c0519 50%, #831843 100%);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        `;

        overlay.innerHTML = `
            <div id="auth-card" style="
                background: rgba(255, 255, 255, 0.08);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 24px;
                padding: 40px 30px;
                max-width: 420px;
                width: 100%;
                text-align: center;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                color: #fff;
            ">
                <div style="font-size: 3rem; margin-bottom: 10px;">🔒</div>
                <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.8rem; margin: 0 0 8px 0; color: #fff; font-weight: 700;">
                    Intermediate English B1
                </h2>
                <p style="font-size: 0.95rem; color: rgba(255, 255, 255, 0.8); margin: 0 0 25px 0;">
                    Acceso protegido para alumnos autorizados.
                </p>

                <form id="auth-form" onsubmit="handleAuthSubmit(event)" style="display: flex; flex-direction: column; gap: 15px;">
                    <div style="position: relative;">
                        <input type="password" id="auth-password-input" placeholder="Ingresa tu contraseña" required autocomplete="current-password" style="
                            width: 100%;
                            padding: 14px 45px 14px 16px;
                            border-radius: 12px;
                            border: 1px solid rgba(255, 255, 255, 0.3);
                            background: rgba(0, 0, 0, 0.35);
                            color: #fff;
                            font-size: 1rem;
                            box-sizing: border-box;
                            outline: none;
                            transition: border-color 0.3s;
                        " onfocus="this.style.borderColor='#f472b6'" onblur="this.style.borderColor='rgba(255, 255, 255, 0.3)'">
                        
                        <button type="button" onclick="togglePasswordVisibility()" style="
                            position: absolute;
                            right: 12px;
                            top: 50%;
                            transform: translateY(-50%);
                            background: none;
                            border: none;
                            color: rgba(255, 255, 255, 0.7);
                            cursor: pointer;
                            font-size: 1.1rem;
                            padding: 4px;
                        " title="Mostrar/Ocultar contraseña">👁️</button>
                    </div>

                    <div style="display: flex; align-items: center; justify-content: flex-start; gap: 8px; text-align: left; font-size: 0.85rem; color: rgba(255,255,255,0.85);">
                        <input type="checkbox" id="auth-remember-check" checked style="accent-color: #db2777; width: 16px; height: 16px; cursor: pointer;">
                        <label for="auth-remember-check" style="cursor: pointer;">Recordar en este dispositivo</label>
                    </div>

                    <div id="auth-error-msg" style="display: none; color: #fca5a5; font-size: 0.85rem; font-weight: 500; background: rgba(239, 68, 68, 0.2); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.4);">
                        ❌ Contraseña incorrecta. Inténtalo de nuevo.
                    </div>

                    <button type="submit" style="
                        width: 100%;
                        padding: 14px;
                        border-radius: 12px;
                        border: none;
                        background: linear-gradient(135deg, #db2777 0%, #be185d 100%);
                        color: #fff;
                        font-weight: 700;
                        font-size: 1rem;
                        cursor: pointer;
                        transition: transform 0.2s, box-shadow 0.2s;
                        box-shadow: 0 4px 15px rgba(219, 39, 119, 0.4);
                        margin-top: 5px;
                    " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                        Ingresar a la Plataforma 🚀
                    </button>
                </form>

                <p style="font-size: 0.75rem; color: rgba(255, 255, 255, 0.5); margin: 25px 0 0 0;">
                    © 2026 St. Mary's English Course — All rights reserved.
                </p>
            </div>
        `;

        document.documentElement.appendChild(overlay);
        setTimeout(() => {
            const input = document.getElementById('auth-password-input');
            if (input) input.focus();
        }, 100);
    }

    window.togglePasswordVisibility = function () {
        const input = document.getElementById('auth-password-input');
        if (!input) return;
        input.type = input.type === 'password' ? 'text' : 'password';
    };

    window.handleAuthSubmit = function (e) {
        if (e) e.preventDefault();
        const input = document.getElementById('auth-password-input');
        const rememberCheck = document.getElementById('auth-remember-check');
        const errorMsg = document.getElementById('auth-error-msg');
        const card = document.getElementById('auth-card');

        if (!input) return;
        const entered = input.value.trim().toLowerCase();

        if (VALID_PASSWORDS.includes(entered)) {
            setAuthenticated(rememberCheck ? rememberCheck.checked : true);
            const overlay = document.getElementById('platform-auth-overlay');
            if (overlay) {
                overlay.style.transition = 'opacity 0.4s ease';
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 400);
            }
            injectLogoutButton();
        } else {
            if (errorMsg) errorMsg.style.display = 'block';
            if (card) {
                card.style.animation = 'authShake 0.4s ease';
                setTimeout(() => { card.style.animation = ''; }, 400);
            }
            input.value = '';
            input.focus();
        }
    };

    function injectLogoutButton() {
        const nav = document.querySelector('nav');
        if (!nav || document.getElementById('platform-logout-btn')) return;

        const logoutBtn = document.createElement('button');
        logoutBtn.id = 'platform-logout-btn';
        logoutBtn.className = 'btn';
        logoutBtn.innerHTML = '🔒 Salir';
        logoutBtn.title = 'Bloquear plataforma';
        logoutBtn.style.cssText = 'padding: 6px 12px; font-size: 0.8rem; background: rgba(239, 68, 68, 0.2); border-color: rgba(239, 68, 68, 0.5); color: #fff; cursor: pointer;';
        logoutBtn.onclick = window.logoutPlatform;

        const navContainers = nav.querySelectorAll('div');
        if (navContainers.length > 0) {
            const lastContainer = navContainers[navContainers.length - 1];
            lastContainer.appendChild(logoutBtn);
        } else {
            nav.appendChild(logoutBtn);
        }
    }

    function initAuth() {
        if (!isAuthenticated()) {
            createAuthModal();
        } else {
            document.addEventListener('DOMContentLoaded', injectLogoutButton);
        }
    }

    // Add shake keyframe style if needed
    if (!document.getElementById('auth-styles')) {
        const style = document.createElement('style');
        style.id = 'auth-styles';
        style.innerHTML = `
            @keyframes authShake {
                0%, 100% { transform: translateX(0); }
                20%, 60% { transform: translateX(-10px); }
                40%, 80% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);
    }

    initAuth();
})();
