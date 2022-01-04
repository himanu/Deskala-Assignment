
const Delete = ({ onDelete }) => {
    return (
      <button onClick={onDelete} style={{cursor: "pointer"}}>
        <i aria-label="icon: delete" style={{ fontSize: "18px" }}>
          <svg
            viewBox="64 64 896 896"
            data-icon="delete"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"></path>
          </svg>
        </i>
      </button>
    );
  };
  export default Delete;