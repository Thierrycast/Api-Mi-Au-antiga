const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const uploadImage = async (folder, id, image) => {
  const buffer = Buffer.from(image, "base64");

  try {
    const imagem = await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(`${folder}/profilepic${id}.jpg`, buffer);

    const { data } = supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .getPublicUrl(imagem.data.path);

    const response = { data, error: null };
    return response;
  } catch (error) {
    const response = { error };
    return response;
  }
};

const updateImage = async (folder, id, image) => {
  if (!image) {
    const imageURL = await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .getPublicUrl(`${folder}/profilepic${id}.jpg`);

    return imageURL;
  }

  const buffer = Buffer.from(image, "base64");

  try {
    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .update(`${folder}/profilepic${id}.jpg`, buffer, {
        cacheControl: "3600",
        upsert: false,
      });
    const response = { data, error };

    return response;
  } catch (error) {
    const response = { error };

    return response;
  }
};

module.exports = { uploadImage, updateImage };
