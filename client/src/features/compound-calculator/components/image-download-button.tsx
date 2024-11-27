/**
 * Created by tkdgu:박상현 on 2024-11-27
 */
import html2canvas from 'html2canvas';
import { dateShortISO } from '@/lib/date-helpers.ts';
import { Button } from '@/components/ui/button.tsx';
import { Download } from 'lucide-react';

export default function ImageDownloadButton({ id, fileName }: { id: string; fileName: string }) {
  function onClickDownloadButton() {
    const target = document.getElementById(id);
    if (!target) {
      return alert('사진 저장에 실패했습니다.');
    }
    html2canvas(target).then((canvas) => {
      const link = document.createElement('a');
      document.body.appendChild(link);
      link.href = canvas.toDataURL('image/png');
      link.download = `growi-${fileName}-${dateShortISO(new Date())}.png`; // 다운로드 이미지 파일 이름
      link.click();
      document.body.removeChild(link);
    });
  }
  return (
    <Button onClick={onClickDownloadButton}>
      <span>저장</span>
      <Download className="ml-1 h-4 w-4" />
    </Button>
  );
}
