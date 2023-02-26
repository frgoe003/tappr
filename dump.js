//keydown handler
useEffect(() => {
    const handleKeyDown = (event) => {
      console.log(event.key)
      if (event.key === 'Enter') {
        changeColor();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Return a cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
}, []);