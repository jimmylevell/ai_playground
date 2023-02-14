export default function Service({
  onDelete,
  onEdit,
  service,
}) {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted">{service._id}</h6>
        <h6 className="card-subtitle mb-2 text-muted">
          <i>
            Last updated:{' '}
            {service.updatedAt.toString()?.replace('T', ' ').split('.')[0]}
          </i>
        </h6>
        <h5 className="card-title">{service.name}</h5>
        <h6 className="card-title float-right"></h6>

        <button
          type="button"
          className="btn btn-primary m-1"
          onClick={onEdit}
          data-bs-toggle="modal"
          data-bs-target="#serviceeditor"
        >
          <i className="bi bi-pencil"></i> Edit
        </button>

        <button type="button" className="btn btn-danger m-1" onClick={onDelete}>
          <i className="bi bi-trash"></i> Delete
        </button>
      </div>
    </div>
  )
}
