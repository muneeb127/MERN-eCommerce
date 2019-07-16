import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import $ from "jquery";

const UploadImage = ({ name, value, type, error, info, onChange }) => {
  // Add the following code if you want the name of the file appear on select

  $(".custom-file-input").on("change", function() {
    var fileName = $(this)
      .val()
      .split("\\")
      .pop();
    $(this)
      .siblings(".custom-file-label")
      .addClass("selected")
      .html(fileName);
  });

  return (
    <div className="custom-file">
      <input
        className={classnames(
          "custom-file-input form-control form-control-lg",
          {
            "is-invalid": error
          }
        )}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
      <label className="custom-file-label">Choose file</label>

      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

UploadImage.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default UploadImage;
