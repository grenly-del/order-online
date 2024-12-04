
import counterID from "../models/productModel/counterID";
/**
 * Fungsi untuk menghasilkan ID unik
 * @param {String} prefix - Prefix ID (contoh: 'PE')
 * @returns {Promise<String>} - ID unik yang di-generate
 */

export const GenereteID = async (prefix="PE") => {
    try {
        // Temukan counter berdasarkan prefix dan tingkatkan count
        const counter = await counterID.findOneAndUpdate(
            { prefix },
            { $inc: { count: 1 } },
            { new: true, upsert: true } // Buat dokumen baru jika tidak ditemukan
        );

        // Format ID dengan padding angka (contoh: PE001)
        const formattedId = `${prefix}${String(counter.count).padStart(3, '0')}`;

        return formattedId;
    } catch (error) {
        console.error('Error generating unique ID:', error);
        throw new Error('Failed to generate unique ID');
    }
}   