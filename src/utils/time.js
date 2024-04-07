export default function formatTimeDifference(timestamp) {
  const now = new Date();
  const messageTime = new Date(timestamp);
  const diffTime = now - messageTime;

  // Chuyển đổi milliseconds thành phút, giờ, ngày, tuần
  const minutes = Math.floor(diffTime / 60000); // 1 phút = 60000 milliseconds
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  // Xử lý các trường hợp khác nhau
  if (minutes < 60) {
    return `${minutes} phút`;
  } else if (hours < 24) {
    return `${hours} giờ`;
  } else if (days < 7) {
    return `Thứ ${messageTime.getDay()}`;
  } else {
    return `${messageTime.getDate()}/${messageTime.getMonth() + 1}/${messageTime.getFullYear()}`;
  }
}
