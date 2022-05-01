use crate::cache::CacheError;
use axum::response::IntoResponse;
use color_eyre::Report;
use hyper::StatusCode;

pub(crate) struct ReportError(Report);

impl IntoResponse for ReportError {
    fn into_response(self) -> axum::response::Response {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Internal Server Error: {:?}", self.0),
        )
            .into_response()
    }
}

impl From<Report> for ReportError {
    fn from(err: Report) -> Self {
        ReportError(err)
    }
}

impl From<CacheError> for ReportError {
    fn from(err: CacheError) -> Self {
        Self(err.into())
    }
}
