import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpIcon } from 'lucide-react';

import './App.css';

function App() {
   const [message, setMessage] = useState('');
   useEffect(() => {
      fetch('/api')
         .then((res) => res.text())
         .then((data) => setMessage(data));
   }, []);
   return (
      <div className="p-4">
         <p className="font-bold p-4 text-3xl">{message}</p>
         <Button variant="outline">Button</Button>
         {/* <Button variant="outline" size="icon" aria-label="Submit">
        <ArrowUpIcon />
      </Button> */}
      </div>
   );
}

export default App;
