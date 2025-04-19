import {BrowserRouter, Routes, Route} from "react-router-dom";
import NoteList from "./components/NoteList";
import AddNote from "./components/AddNote";
import EditNote from "./components/EditNote";
import ViewNote from "./components/ViewNote";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NoteList/>}/>
        <Route path="add" element={<AddNote/>}/>
        <Route path="edit/:id" element={<EditNote/>}/>
        <Route path="view/:id" element={<ViewNote/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
