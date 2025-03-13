if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("새 서비스 워커가 활성화됨. 페이지를 새로고침합니다.");
        window.location.reload();
    });
}
