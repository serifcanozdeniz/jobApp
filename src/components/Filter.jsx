import { useDispatch } from "react-redux";
import { statusOptions, typeOptions, sortOptions } from "../constants/index";
import { filterBySearch } from "../redux/slices/jobSlice";
import { sortJobs } from "../redux/slices/jobSlice";
import { useState } from "react";
import { useEffect } from "react";
import { useDebounce } from "../../node_modules/@uidotdev/usehooks/index";

const Filter = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  // 2.yol
  const debouncedText = useDebounce(text, 300);

  // her tuş vuruşunda filtreleme yapmak düşük donanımlı cihazlarda kasmalara ve donmalara sebep olabileceğinden filtreleme işlemini kullanıcı yazma işini bıraktığın anda yapmalıyız. Bu işleme Debounce denir. Ardışık olarak gerçekleşen fonksiyon çağırma işlemlerinde fonksiyonun kısa bir zaman aralığında çağrıldığını görmezden gelir.
  useEffect(() => {
    // bir sayaç başlart ve işlemi sayaç durduğunda yap
    const timer = setTimeout(() => {
      dispatch(filterBySearch({ text, name: "company" }));
    }, 300);

    // eğer ki süre bitmeden tekrardan useeffect çalışırsa önceki sayacın çalışmasını durdur
    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  return (
    <section className="filter-sec">
      <h2>Filtreleme Formu</h2>
      <form>
        <div>
          <label>Şirket İsmine Göre Ara</label>
          <input onChange={(e) => setText(e.target.value)} type="text" />
        </div>

        <div>
          <label>Durum</label>
          <select
            onChange={(e) => {
              dispatch(
                filterBySearch({ name: "status", text: e.target.value })
              );
            }}
          >
            <option hidden>Seçiniz</option>
            {statusOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Tür</label>
          <select
            onChange={(e) => {
              dispatch(filterBySearch({ name: "type", text: e.target.value }));
            }}
          >
            <option hidden>Seçiniz</option>
            {typeOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Sırala</label>
          <select
            onChange={(e) => {
              dispatch(sortJobs(e.target.value));
            }}
          >
            <option hidden>Seçiniz</option>
            {sortOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button type="reset" id="special-button">
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <span className="text">Sıfırla</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
