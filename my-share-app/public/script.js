// 데이터 저장소
let shares = JSON.parse(localStorage.getItem('shares')) || [];

// 나눔 작성 처리
const form = document.getElementById('share-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const images = document.getElementById('image').files;

        if (images.length === 0) {
            alert('최소 한 장의 이미지를 첨부해주세요.');
            return;
        }

        Array.from(images).forEach((image) => {
            const reader = new FileReader();
            reader.onload = function () {
                const share = { id: Date.now() + Math.random(), title, image: reader.result };
                shares.push(share);
                localStorage.setItem('shares', JSON.stringify(shares));
            };
            reader.readAsDataURL(image);
        });

        alert('나눔이 작성되었습니다!');
        window.location.href = 'index.html';
    });
}

// 나눔 목록 표시
const gallery = document.getElementById('gallery');
if (gallery) {
    shares.forEach((share) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.textContent = share.title;

        // 터치하면 이미지 보기
        galleryItem.addEventListener('click', () => showImage(share.id, share.image));
        gallery.appendChild(galleryItem);
    });
}

// 이미지 모달 표시
function showImage(id, imageSrc) {
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.innerHTML = `
        <img src="${imageSrc}" alt="Shared Image">
        <button class="complete-btn" onclick="completeShare(${id})">사용 완료</button>
        <button class="close-btn" onclick="closeModal()">X</button>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

// 모달 닫기
function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.remove();
    }
}

// 사용 완료 처리 (삭제)
function completeShare(id) {
    const confirmDelete = confirm('정말 사용 완료로 처리하시겠습니까?');
    if (confirmDelete) {
        shares = shares.filter((share) => share.id !== id);
        localStorage.setItem('shares', JSON.stringify(shares));
        alert('사용 완료로 처리되었습니다.');
        closeModal();
        location.reload();
    }
}
