import { FaFacebook, FaTwitter, FaInstagram, FaReddit, FaSteam, FaGoogle, FaMicrosoft } from 'react-icons/fa';

const getCategoryIcon = (category) => {
    switch (category) {
      case 'Facebook':
        return <FaFacebook size={50} color="#1877f2" />;
      case 'Twitter':
        return <FaTwitter size={50} color="#1DA1F2" />;
      case 'Instagram':
        return <FaInstagram size={50} color="#8a3ab9" />;
      case 'Reddit':
        return <FaReddit size={50} color="#FF4500" />;
      case 'Steam':
        return <FaSteam size={50} color="#000000" />;
      case 'Google':
        return <FaGoogle size={50} color="#4285F4" />;
      case 'Microsoft':
        return <FaMicrosoft size={50} color="#00A1F1" />;
      // Add more cases for additional categories
      default:
        return null; // Return null if no matching category is found
    }
  };

  export default getCategoryIcon;