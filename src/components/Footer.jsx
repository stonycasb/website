export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #ddd',
        padding: '30px 20px',
        marginTop: '60px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
          <a
            href="https://instagram.com/stonycasb"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#da2928',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ display: 'block' }}
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @stonycasb
          </a>
          <a
            href="https://linktr.ee/stonycasb"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#da2928',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ display: 'block' }}
            >
              <path d="M13.5108 5.85343L17.5158 1.73642L19.8404 4.11701L15.6393 8.12199H21.5488V11.4268H15.6113L19.8404 15.5345L17.5158 17.8684L11.7744 12.099L6.03299 17.8684L3.70842 15.5438L7.93745 11.4361H2V8.12199H7.90944L3.70842 4.11701L6.03299 1.73642L10.038 5.85343V0H13.5108V5.85343ZM10.038 16.16H13.5108V24H10.038V16.16Z"/>
            </svg>
            Linktree
          </a>
        </div>
      </div>
    </footer>
  );
}
