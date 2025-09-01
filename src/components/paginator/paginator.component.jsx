import './paginator.styles.scss';

export default function Paginator({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="paginator">
            <ul className="paginator__list">
                {
                    currentPage > 1 && (
                        <>
                            <li className="paginator__item" onClick={() => onPageChange(1)} title='Primeira Página'>
                                <i className="bi bi-arrow-bar-left"></i>
                            </li>
                            <li className="paginator__item" onClick={() => onPageChange(currentPage - 1)} title='Página Anterior'>
                                <i className="bi bi-arrow-left-circle-fill"></i>
                            </li>
                            <li className="paginator__item" onClick={() => onPageChange(currentPage - 1)} title={`Página ${currentPage - 1}`}>
                                { currentPage - 1 }
                            </li>
                        </>
                    )
                }

                <li className="paginator__item paginator__item--active" title={'Página atual'}>
                    { currentPage }
                </li>
                

                {
                    currentPage < totalPages && (
                        <>
                            <li className="paginator__item" onClick={() => onPageChange(currentPage + 1)} title={`Página ${currentPage + 1}`}>
                                { currentPage + 1 }
                            </li>
                            <li className="paginator__item" onClick={() => onPageChange(currentPage + 1)} title={'Próxima página'}>
                                <i className="bi bi-arrow-right-circle-fill"></i>
                            </li>
                            <li className="paginator__item" onClick={() => onPageChange(500)} title={`Última Página`}>
                                <i className="bi bi-arrow-bar-right"></i>
                            </li>
                        </>
                    )
                }
            </ul>
        </div>
    )
}