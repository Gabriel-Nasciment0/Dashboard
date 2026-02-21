export default function Card({ children, status, ...props }) {
    return (
        <div
            className={`card card-${status}`}
            {...props}
        >
            {children}
        </div>
    )
}
