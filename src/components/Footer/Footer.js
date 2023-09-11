// Styles
import './footer.scss';

// Logos & Icons
import { Petropo, Redag, Werqu, Ahs } from '../../assets/sponsors-logos/index';
import { Facebook, Twitter, LinkedIn, Instagram } from '../../assets/social-media-icons/index';

const social_media = [
  { name: "Facebook", iconSource: Facebook },
  { name: "Twitter", iconSource: Twitter },
  { name: "Instagram", iconSource: Instagram },
  { name: "LinkedIn", iconSource: LinkedIn }
];

export default function Footer() {

  // Social media redirecting
  const handleClick = (mediaName) => {
    window.open(`https://${mediaName}.com`, '_blank');
  };

  return (
    <div className="footer">
      <div className="footer-links">

        {/* Social media links */}
        <p className="footer-paragraph">Find us on social media:</p>
        <ul>
          {social_media.map(media => (
            <li key={media.name} onClick={() => handleClick(media.name)}>
              <img height="25px" width="25px" src={media.iconSource} alt={`${media.name} icon`}/>
              <p>{media.name}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Sponsors logos */}
      <p className="footer-paragraph">Our sponsors: </p>
      <div className="footer-sponsors">
        <img height="150px" width="150px" src={Petropo} alt="sponsor logo: Petropo " />
        <img height="150px" width="150px" src={Werqu} alt="sponsor logo: Werqu Incorporado" />
        <img height="150px" width="150px" src={Ahs} alt="sponsor logo: AHS" />
        <img height="150px" width="150px" src={Redag} alt="sponsor logo: REDAG development" />
      </div>

      {/* Copyright note */}
      <p className="footer-paragraph">Copyright 2023</p>
    </div>
  );
};
