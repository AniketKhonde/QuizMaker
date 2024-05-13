import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import CreateQuiz from './Components/CreateQuize';
import MyQuizes from './Components/MyQuizes';
import PlayQuize from './Components/PlayQuize';

const App = () => {
    return (
        <Router>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/CreateQuiz" element={<CreateQuiz />} />
        <Route path="/MyQuizes" element={<MyQuizes />} />
        <Route path="/PlayQuize" element={<PlayQuize />} />
        
    </Routes>
</Router>
    );
};

export default App;
