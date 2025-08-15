// ==UserScript==
// @name         Bing AutoSearch (Tampermonkey Version)
// @namespace    https://github.com/gerisonsabino/bing_autosearch
// @version      1.0
// @description  Auto search Bing for Microsoft Rewards
// @author       gerisonsabino + Quang
// @match        https://www.bing.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ======== CONFIG ========
    const searchTerms = [
        "Ancestors: The Humankind Odyssey",
        "Angry Birds 2",
        "Apex Legends",
        "Asphalt 9: Legends",
        "Assassin's Creed Valhalla",
        "Batman: Arkham Knight",
        "Battlefield V",
        "BioShock Infinite",
        "Call of Duty: Modern Warfare",
        "Cuphead",
        "Diablo IV",
        "Elden Ring",
        "FIFA 21",
        "Fallout 4",
        "Far Cry 6",
        "Fortnite",
        "GTA V",
        "Halo Infinite",
        "League of Legends",
        "Need for Speed Heat",
        "Overwatch",
        "PUBG",
        "Resident Evil Village",
        "Spider-Man",
        "The Legend of Zelda: Breath of the Wild",
        "The Witcher 3",
        "Valorant",
        "Watch Dogs: Legion",
        "Cyberpunk 2077"
    ];

    const intervalMs = 5000; // Delay 5 giây giữa các lần search
    // ========================

    let index = parseInt(localStorage.getItem("bing_auto_index") || "0", 10);

    if (index >= searchTerms.length) {
        console.log("Bing AutoSearch: Hoàn thành tất cả tìm kiếm.");
        localStorage.removeItem("bing_auto_index");
        return;
    }

    if (window.location.pathname === "/search") {
        // Đang ở trang kết quả → chờ rồi tìm tiếp
        setTimeout(() => {
            index++;
            localStorage.setItem("bing_auto_index", index);
            if (index < searchTerms.length) {
                window.location.href = `https://www.bing.com/search?q=${encodeURIComponent(searchTerms[index])}`;
            } else {
                console.log("Bing AutoSearch: Hoàn tất.");
                localStorage.removeItem("bing_auto_index");
            }
        }, intervalMs);
    } else {
        // Đang ở trang bing.com gốc → bắt đầu search
        window.location.href = `https://www.bing.com/search?q=${encodeURIComponent(searchTerms[index])}`;
    }
})();
