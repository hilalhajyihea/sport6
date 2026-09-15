function required(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`חסר המשתנה ${name} בורסל`);
  }
  return value;
}

export async function uploadToR2(file: File) {
  const accountId = required("R2_ACCOUNT_ID");
  const accessKeyId = required("R2_ACCESS_KEY_ID");
  const secretAccessKey = required("R2_SECRET_ACCESS_KEY");
  const bucket = required("R2_BUCKET");
  const publicBase = required("R2_PUBLIC_URL").replace(/\/$/, "");
  const { AwsClient } = await import("aws4fetch");

  const safeName = file.name.replace(/[^\w.\-א-ת]+/g, "-") || "image";
  const key = `articles/${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safeName}`;
  const endpoint = `https://${accountId}.r2.cloudflarestorage.com/${bucket}/${key}`;
  const client = new AwsClient({
    accessKeyId,
    secretAccessKey,
    service: "s3",
    region: "auto",
  });

  const body = Buffer.from(await file.arrayBuffer());
  const response = await client.fetch(endpoint, {
    method: "PUT",
    body,
    headers: {
      "Content-Type": file.type || "application/octet-stream",
      "Content-Length": String(body.byteLength),
    },
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `העלאה לקלאודפלייר נכשלה (${response.status})`);
  }

  return `${publicBase}/${key}`;
}
