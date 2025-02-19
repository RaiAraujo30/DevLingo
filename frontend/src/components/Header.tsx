import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={styles.header}>
      <h1>DevLingo</h1>
      <nav>
        <ul style={styles.navList}>
          <li><Link to="/" style={styles.navLink}>Home</Link></li>
          <li><Link to="/login" style={styles.navLink}>Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#282c34",
    color: "white",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
  },
  navLink: {
    textDecoration: "none",
    color: "white",
    fontSize: "18px",
  },
};

export default Header;
