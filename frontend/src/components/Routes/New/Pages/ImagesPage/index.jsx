import FormError from "../../../../Forms/FormError";

function ImagesPage({
  type,
  previewUrl,
  setPreviewUrl,
  url1,
  setUrl1,
  url2,
  setUrl2,
  url3,
  setUrl3,
  url4,
  setUrl4,
  errors,
}) {
  if (!type || typeof type !== "string") return null;
  return (
    <div id="images-page">
      <p style={{ fontSize: "30px", fontWeight: 500, marginTop: 0 }}>
        Add some photos of your {type.toLowerCase()}
      </p>
      <p>
        You'll need 5 photos to get started. You can add more or make
        changes later.
      </p>
      <form id="images-form">
        <label htmlFor="preview-url" className="hidden-label" />
        <input
          id="preview-url"
          className="top-input"
          type="url"
          value={previewUrl}
          onChange={(e) => setPreviewUrl(e.target.value)}
          required
          placeholder="Preview image"
        />
        <label htmlFor="url-one" className="hidden-label" />
        <input
          id="url-one"
          className="middle-input"
          type="url"
          value={url1}
          onChange={(e) => setUrl1(e.target.value)}
          required
          placeholder="Image url one"
        />
        <label htmlFor="url-two" className="hidden-label" />
        <input
          id="url-two"
          className="middle-input"
          type="url"
          value={url2}
          onChange={(e) => setUrl2(e.target.value)}
          required
          placeholder="Image url two"
        />
        <label htmlFor="url-three" className="hidden-label" />
        <input
          id="url-three"
          className="middle-input"
          type="url"
          value={url3}
          onChange={(e) => setUrl3(e.target.value)}
          required
          placeholder="Image url three"
        />
        <label htmlFor="url-four" className="hidden-label" />
        <input
          id="url-four"
          className="bottom-input"
          type="url"
          value={url4}
          onChange={(e) => setUrl4(e.target.value)}
          required
          placeholder="Image url four"
        />
      </form>
      <FormError errors={errors} />
    </div>
  );
}

export default ImagesPage;
