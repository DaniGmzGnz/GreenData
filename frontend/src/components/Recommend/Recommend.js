import cloud from '../../img/cloud.png';
import Cards from './Cards';
import './recommend.css';

export default function Recommend(props) {

  const name_org = props.result.Name_organ[0];
  const year = props.result.Year[0];

    return (
      <div class="main-recommend">
        <div class="box">
          <div class="head-box">
            <div class="a">{name_org}</div>
            <div class="b">{year}</div>
          </div>
          <Cards/>
          <div className='end-recommend'>

          </div>
        </div>
      </div>
    );
  }