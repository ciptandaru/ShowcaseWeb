import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__addr">
          <ul className="footer__nav">
            <li className="nav__item">
              <h2 className="nav__title">SHOP</h2>

              <ul className="nav__ul">
                <li>
                  <a href="#">Women</a>
                </li>

                <li>
                  <a href="#">Men</a>
                </li>

                <li>
                  <a href="#">H&M Home</a>
                </li>
              </ul>
            </li>

            <li className="nav__item ">
              <h2 className="nav__title">INFO</h2>
            </li>

            <ul className="nav__ul">
              <li>
                <a href="#">Career at H&M</a>
              </li>

              <li>
                <a href="#">About H&M Group</a>
              </li>

              <li>
                <a href="#">Press</a>
              </li>
            </ul>

            <li className="nav__item">
              <h2 className="nav__title">CORPORATE</h2>
              <ul className="nav__ul">
                <li>
                  <a href="#">Corporate Governance</a>
                </li>

                <li>
                  <a href="#">Investor Relations</a>
                </li>

                <li>
                  <a href="#">Sustainability</a>
                </li>
              </ul>
            </li>

            <li className="nav__item">
              <h2 className="nav__title">HELP</h2>

              <ul className="nav__ul">
                <li>
                  <a href="#">Customer Service</a>
                </li>

                <li>
                  <a href="#">Store Locator</a>
                </li>

                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="legal">
          <p style={{textAlign: "center"}}>2020 Lokode. All rights reserved.</p>

          <p>
            The content of this site is copyright-protected and is the property
            of H&M Hennes & Mauritz AB. H&M's business concept is to offer
            fashion and quality at the best price. H&M has
          </p>
          <img
            src="https://cdn.freebiesupply.com/images/large/2x/hm-logo-black-and-white.png"
            height="40px"
          />
        </div>
      </footer>
    </>
  );
};
export default Footer;
