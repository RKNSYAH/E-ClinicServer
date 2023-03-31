const { data } = require('./datas.js');
const { diagnosa, obat_pasien } = require('./diagnosaData.js');
const { dokter, klinik, golongan_darah } = require('./dokterdata.js');
const { pendaftaran, antrian } = require('./pendaftaranData.js');

pendaftaran.belongsTo(dokter, {foreignKey: 'dokter_id'})
antrian.belongsTo(pendaftaran, {foreignKey: 'pendaftaran_id'})
antrian.belongsTo(klinik, {foreignKey: 'klinik_id'})
antrian.belongsTo(data, {foreignKey: 'pasien_id'})
dokter.belongsTo(pendaftaran, {foreignKey: 'dokter_id'})
diagnosa.hasOne(obat_pasien, {foreignKey: 'diagnosa_id', constraints: false})
obat_pasien.belongsTo(diagnosa, {foreignKey: 'diagnosa_id', constraints: false})
diagnosa.belongsTo(data, {foreignKey: 'pasien_id'})
diagnosa.belongsTo(dokter, {foreignKey: 'dokter_id'})
data.belongsTo(golongan_darah, { foreignKey: 'golongan_darah_id' });
golongan_darah.hasMany(data, { foreignKey: 'golongan_darah_id' });
module.exports = {
    antrian, pendaftaran, klinik, data, golongan_darah
}