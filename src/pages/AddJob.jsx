import axios from "axios";
import { typeOptions, statusOptions } from "../constants";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createJob } from "../redux/slices/jobSlice";
import { useDispatch } from "react-redux";

const AddJob = () => {
  // stateler
  const jobState = useSelector((store) => store.jobReducer);

  // kurulumlar
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // form gönderilince
  const handleSubmit = (e) => {
    e.preventDefault();

    // inputlardaki verilerden bir nesne oluştur
    const formData = new FormData(e.target);
    const newJobData = Object.fromEntries(formData.entries());

    // tarih ve id ekle
    newJobData.date = new Date().toLocaleDateString("tr");
    newJobData.id = v4();

    // api a veriyi ekle
    axios
      .post("http://localhost:3001/jobs", newJobData)
      // başarılı olursa
      .then((res) => {
        // bildirim gönder
        toast.success("Yeni iş Eklendi");

        // store a ekle
        dispatch(createJob(newJobData));

        // ana sayfaya yönlendir
        navigate("/");
      })
      // başarısız olursa
      .catch((err) => {
        // bildirim gönder
        toast.error("Hata Oluştu");
      });
  };

  // dizideki değerleri aynı olan elemanları kaldır
  const removeDuplicates = (key) => {
    // sadece pozisyonlardan oluşan bir dizi tanımla
    const arr = jobState.jobs.map((job) => job[key]);

    // dizi içerisinden tekrar eden elemanı kaldır
    const filtred = arr.filter((item, index) => arr.indexOf(item) === index);

    return filtred;
  };

  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Yeni İş Ekle</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Pozisyon</label>
            <input list="position_list" name="position" type="text" required />

            <datalist id="position_list">
              {removeDuplicates("position").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Şirket</label>
            <input list="company_list" name="company" type="text" required />

            <datalist id="company_list">
              {removeDuplicates("company").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Lokasyon</label>
            <input list="location_list" name="location" type="text" required />

            <datalist id="location_list">
              {removeDuplicates("location").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Durum</label>
            <select name="status" required>
              <option value={""} hidden>
                Seçiniz
              </option>
              {statusOptions.map((text) => (
                <option key={text} value={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Tür</label>
            <select name="type" required>
              <option value={""} hidden>
                Seçiniz
              </option>
              {typeOptions.map((text) => (
                <option key={text} value={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button id="special-button">
              <span className="circle1"></span>
              <span className="circle2"></span>
              <span className="circle3"></span>
              <span className="circle4"></span>
              <span className="circle5"></span>
              <span className="text">Gönder</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
