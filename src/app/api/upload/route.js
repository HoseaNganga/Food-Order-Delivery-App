import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export const POST = async (req) => {
  const photoData = await req.formData();
  const pictureData = photoData.get("file");
  if (pictureData) {
    const s3Client = new S3Client({
      region: "eu-north-1",
      credentials: {
        accessKeyId: process.env.MY_AWS_ACCESSKEY,
        secretAccessKey: process.env.MY_AWS_SECRETKEY,
      },
    });

    const extension = pictureData.name.split(".").slice(-1)[0];
    const newFileName = uniqid() + "." + extension;
    const chunks = [];
    for await (const chunk of pictureData.stream()) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);
    const bucketName = "hosea-food-ordering";

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFileName,
        ACL: "public-read",
        ContentType: pictureData.type,
        Body: buffer,
      })
    );
    const link = "https://" + bucketName + ".s3.amazonaws.com/" + newFileName;
    return Response.json(link);
  }
  return Response.json(true);
};
