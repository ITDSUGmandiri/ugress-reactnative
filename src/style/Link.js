const Link_login = 'http://192.168.3.28/api_cfm/api/Auth/Login';
const Cek_profile = 'http://192.168.3.28/api_cfm/api/Auth/Profile';
const Foto_profile = 'http://192.168.3.28/api_cfm/api/Auth/Foto_profile';
const Link_Permission = 'http://192.168.3.28/api_cfm/api/Auth/Permission';
const Link_ganti_password = 'http://192.168.3.28/api_cfm/api/Auth/Change_pass';
const User_signature = 'http://192.168.3.28/api_cfm/api/Auth/Signature';

const Unit_cek = 'http://192.168.3.28/api_cfm/api/Penghuni/Unit_cek';
const Helpdesk_add = 'http://192.168.3.28/api_cfm/api/Penghuni/Helpdesk_add';
const History_tiket = 'http://192.168.3.28/api_cfm/api/Penghuni/History_tiket';
const List_unit_hunian = 'http://192.168.3.28/api_cfm/api/Penghuni/List_unit';
const Detail_tiket = 'http://192.168.3.28/api_cfm/api/Penghuni/Detail_tiket';
const Detail_unit_link = 'http://192.168.3.28/api_cfm/api/Penghuni/Detail_unit';

const List_incident_teknisi = 'http://192.168.3.28/api_cfm/api/Teknisi/List_incident';
const List_history_teknisi = 'http://192.168.3.28/api_cfm/api/Teknisi/List_history';

const Link_pengecekan = 'http://192.168.3.28/api_cfm/api/Teknisi/Pengecekan';
const Link_progres = 'http://192.168.3.28/api_cfm/api/Teknisi/Progres';
const Link_pending = 'http://192.168.3.28/api_cfm/api/Teknisi/Pending';
const Link_complete = 'http://192.168.3.28/api_cfm/api/Teknisi/finish';
const Link_tambah_foto = 'http://192.168.3.28/api_cfm/api/Teknisi/Tambah_foto';
const Link_ttd = 'http://192.168.3.28/api_cfm/api/Teknisi/Signature';
const Link_list_biaya = 'http://192.168.3.28/api_cfm/api/Teknisi/List_biaya';
const Link_biaya_perbaikan = 'http://192.168.3.28/api_cfm/api/Teknisi/Biaya_perbaikan';
const Link_delete_list_biaya = 'http://192.168.3.28/api_cfm/api/Teknisi/delete_list_biaya';

const List_incident_leader_pending = 'http://192.168.3.28/api_cfm/api/Tl/List_pending';
const List_incident_leader = 'http://192.168.3.28/api_cfm/api/Tl/List_incident';
const List_history_leader = 'http://192.168.3.28/api_cfm/api/Tl/List_history';
const List_kategory_leader = 'http://192.168.3.28/api_cfm/api/Tl/Teknisi';
const Leader_assign = 'http://192.168.3.28/api_cfm/api/Tl/Progres';

const List_tipe_insiden = 'http://192.168.3.28/api_cfm/api/Tl/List_tipe_insiden';

const host = "http://192.168.3.28/"
const token = 'itbs_v1';

export {
    Link_login,
    Cek_profile,
    Foto_profile,
    Link_Permission,
    host,
    Link_ganti_password, User_signature,

    Unit_cek,
    Helpdesk_add,
    History_tiket,
    List_unit_hunian,
    Detail_tiket,
    Detail_unit_link,

    List_history_teknisi,
    List_incident_teknisi,
    Link_pengecekan,
    Link_progres,
    Link_complete,
    Link_pending,
    Link_tambah_foto,
    Link_ttd, Link_list_biaya, Link_biaya_perbaikan, Link_delete_list_biaya,
    List_incident_leader, List_tipe_insiden,
    List_history_leader, List_kategory_leader, Leader_assign, List_incident_leader_pending,
    token
}