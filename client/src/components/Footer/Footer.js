// Styles
import './footer.scss';

// Logos & Icons
import { Petropo, Redag, Werqu, Ahs } from '../../assets/sponsors-logos/index';
import { Facebook, Twitter, LinkedIn, Instagram } from '../../assets/social-media-icons/index';

const SOCIAL_MEDIA = [
  { name: "Facebook", iconSource: Facebook },
  { name: "Twitter", iconSource: Twitter },
  { name: "Instagram", iconSource: Instagram },
  { name: "LinkedIn", iconSource: LinkedIn }
];

export default function Footer() {

  return (
    <div className="footer">

      <div className="credit">
        <small>All event images have been generated with <a href="https://www.hotpot.ai" target="_blank" rel="noreferrer">Hotpot.ai art-generator</a></small><br />
        <small>All names portrayed in this app are a work of fiction.</small><br />
        <small>No identification with actual persons (living or deceased), places, buildings, and products is intended or should be inferred.</small>
      </div>

      <div className="footer-links">
        <small>Find us on social media:</small>
        <ul>
          {SOCIAL_MEDIA.map(media => (
            <li key={media.name} >
              <a href={`https://www.${media.name}.com`} target="_blank" rel="noreferrer">
                <img height="25px" width="25px" src={media.iconSource} alt={`${media.name} icon`}/>
                <small>{media.name}</small>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <small>Our sponsors:</small>
      <div className="footer-sponsors">
        <img height="150px" width="150px" src={Petropo} alt="sponsor logo: Petropo " />
        <img height="150px" width="150px" src={Werqu} alt="sponsor logo: Werqu Incorporado" />
        <img height="150px" width="150px" src={Ahs} alt="sponsor logo: AHS" />
        <img height="150px" width="150px" src={Redag} alt="sponsor logo: REDAG development" />
      </div>

      <small>Copyright 2023</small>
    </div>
  );
};
