import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

import './App.css';

function App() {
   const [message, setMessage] = useState('');

   useEffect(() => {
      fetch('/api')
         .then((response) => response.json())
         .then((data) => setMessage(data.message))
         .catch((error) => console.error('Error fetching message:', error));
   }, []);
   return (
      <div className="p-4">
         <h1 className="text-3xl font-bold underline">
            {message || 'Loading...'}
         </h1>
         <Button variant="outline">Button</Button>
      </div>
   );
}

export default App;
