function Header() {
  // Function to check if user is signed in, else display link to sign in page
  function checkSignedIn() {
    // Check if user is signed in in local storage
    // If user is signed in, display sign out button
    // Else, display sign in button
  }
  return (
    <header>
      <h1>Eventure</h1>
      <nav>
        <a href="/">Home</a>
        {/* Maybe add different genres */}
      </nav>
    </header>
  );
}

export default Header;
