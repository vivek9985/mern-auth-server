export const welcomeTamplete = (name, email) => {
  return `<div
        style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px 30px;
          border: 2px solid #ddd;
          border-radius: 12px;
          background-color: #ffffff;
        "
      >
        <h2 style="color: #4dd051; text-align: center">Congratulation🎉</h2>
        <p style="font-size: 20px; color: black; text-align: center">
          Dear ${name}
        </p>
        <p style="font-size: 18px; color: #333; text-align: center">
          Your account is successfully created with this email: ${email}
        </p>
        <footer
          style="
            margin-top: 30px;
            text-align: center;
            font-size: 14px;
            color: #767474;
          "
        >
          <p>
            Thank you, <br /><a
              href="https://www.godaddy.com/forsale/menzo.com?utm_source=TDFS_BINNS2&utm_medium=parkedpages&utm_campaign=x_corp_tdfs-binns2_base&traffic_type=TDFS_BINNS2&traffic_id=binns2&" target="_blank"
              style="color: black"
              >Menzo</a
            >
          </p>
        </footer>
      </div>`;
};
export const verificationOtpTamplete = (name, verificationCode) => {
  return `<div
      style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px 30px;
        border: 2px solid #b8b2b2;
        border-radius: 12px;
        background-color: #ffffff;
      "
    >
      <h2 style="color: #4caf50; text-align: center">Verification Code</h2>

      <p style="font-size: 20px; font-weight: 500; color: #000000; text-align: center;">Dear ${name},</p>

      <p style="font-size: 18px; color: #333; text-align: center;">Your verification code is:</p>

      <div style="text-align: center; margin: 20px 0">
        <span
          style="
            display: inline-block;
            font-size: 24px;
            font-weight: bold;
            color: #4caf50;
            padding: 10px 20px;
            border: 1px solid #4caf50;
            border-radius: 4px;
          "
        >
          ${verificationCode}
        </span>
      </div>

      <p style="font-size: 16px; color: #333; text-align: center;">
        Please use this code to verify your email address. The code will expire
        in 1 hour.
      </p>

      <p style="font-size: 16px; color: #333; text-align: center;">
        If you did not request this, please ignore this email.
      </p>

      <footer
        style="
          margin-top: 30px;
          text-align: center;
          font-size: 14px;
          color: #999;
        "
      >
        <p>
          Thank you
          <br />
          <a
            href="https://www.godaddy.com/forsale/menzo.com?utm_source=TDFS_BINNS2&utm_medium=parkedpages&utm_campaign=x_corp_tdfs-binns2_base&traffic_type=TDFS_BINNS2&traffic_id=binns2&"
            target="_blank"
            style="color: black"
            >
            Menzo
          </a>
        </p>
      </footer>
    </div>`;
};
