import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.logo}>
          <a href="https://www.bftech.es">
            <Image src="https://www.bftech.es/assets/img/logoBFT.svg" alt="BFTech Logo" width={110} height={30} />
          </a>
          <p>Building Future Technologies</p>
          <br />
          <a href="https://www.linkedin.com/company/bftech-consultora-tecnológica/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://www.instagram.com/bftech.es/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>

        <div className={styles.footerLinks}>
          <a href="https://www.bftech.es/servicios.html"><p>Servicios</p></a>
          <a className={styles.linkDisplay} href="https://www.bftech.es/servicios.html#web">Desarrollo Web</a>
          <a className={styles.linkDisplay} href="https://www.bftech.es/servicios.html#software">Software a medida</a>
          <a className={styles.linkDisplay} href="https://www.bftech.es/servicios.html#apps">Apps móviles</a>
          <a className={styles.linkDisplay} href="https://www.bftech.es/servicios.html#consultoria">Consultoría</a>
          <a className={styles.linkDisplay} href="https://www.bftech.es/servicios.html#ia">Integración IA</a>
        </div>

        <div className={styles.footerLinks}>
          <a href="https://www.bftech.es/nosotros.html"><p>Empresa</p></a>
          <a className={styles.linkDisplay} href="https://www.bftech.es/nosotros.html#mision">Nuestra Misión</a>
          <a className={styles.linkDisplay} href="https://www.bftech.es/nosotros.html#valores">Nuestros Valores</a>
          <a className={styles.linkDisplay} href="https://www.bftech.es/proyectos.html">Proyectos</a>
        </div>

        <div className={styles.footerLinks}>
          <a href="https://www.bftech.es/contacto.html"><p>Contacto</p></a>
          <a className={styles.linkDisplay} href="mailto:info@bftech.com">info@bftech.com</a>
          <a className={styles.linkDisplay} href="tel:+34646476662">+34 646 476 662</a>
          <a className={styles.linkDisplay}>Madrid, España</a>
        </div>

        <div className={styles.footerLinks}>
          <a href="https://www.bftech.es/aviso-legal.html"><p>Legal</p></a>
          <a className={styles.linkDisplay} href="https://www.bftech.es/politica-privacidad.html">Política de Privacidad</a>
          <a className={styles.linkDisplay} href="https://www.bftech.es/terminos-servicio.html">Términos de Servicio</a>
          <a className={styles.linkDisplay} href="https://www.bftech.es/aviso-legal.html">Aviso Legal</a>
          <a className={styles.linkDisplay} href="https://www.bftech.es/politica-cookies.html">Política de Cookies</a>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2026 BFTech. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}