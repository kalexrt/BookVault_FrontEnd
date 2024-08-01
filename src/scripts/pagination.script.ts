export class Pagination {
    private container: HTMLElement;
    private currentPage: number;
    private totalPages: number | null;
    private onPageChange: (page: number) => void;
  
    constructor(containerId: string, onPageChange: (page: number) => void) {
      this.container = document.getElementById(containerId) as HTMLElement;
      this.currentPage = 1;
      this.totalPages = null;
      this.onPageChange = onPageChange;
    }
  
    update(currentPage: number, totalPages: number | null) {
      this.currentPage = currentPage;
      this.totalPages = totalPages;
      this.render();
    }
  
    private render() {
      const paginationHTML = `
        <div class="flex items-center justify-center mt-4">
          <button class="text-black px-4 py-2 mx-1 bg-gray-200 rounded ${this.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}" 
                  ${this.currentPage === 1 ? 'disabled' : ''} 
                  data-action="prev">Previous</button>
          <span class="mx-4">Page ${this.currentPage}${this.totalPages ? ` of ${this.totalPages}` : ''}</span>
          <button class="text-black px-4 py-2 mx-1 bg-gray-200 rounded ${this.totalPages !== null && this.currentPage === this.totalPages ? 'opacity-50 cursor-not-allowed' : ''}" 
                  ${this.totalPages !== null && this.currentPage === this.totalPages ? 'disabled' : ''} 
                  data-action="next">Next</button>
        </div>
      `;
  
      this.container.innerHTML = paginationHTML;
      this.addEventListeners();
    }
  
    private addEventListeners() {
      this.container.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (e) => {
          const action = (e.target as HTMLButtonElement).getAttribute('data-action');
          if (action === 'prev' && this.currentPage > 1) {
            this.onPageChange(this.currentPage - 1);
          } else if (action === 'next' && (this.totalPages === null || this.currentPage < this.totalPages)) {
            this.onPageChange(this.currentPage + 1);
          }
        });
      });
    }
  }