import './results.css';

export default function Result() {
    return (
      <main>
        <div class="boxbox">
            <div class="box-scope">
              Scope 1 & 2
            </div>
            <div  class="box-scope">
              Scope 3
            </div>
        </div>
      </main>
    );
  }



  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '20px',
    paddingBottom: "10px",
    paddingTop: "10px",
    gap: '50px',
    backgroundColor: 'transparent',
    borderRadius: "5px",
    marginBottom: "15px",
    border: '2px solid black',
}